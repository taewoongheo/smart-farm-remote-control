import React from 'react';
import {
  render,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native';
import SensorData from '../../src/components/SensorData';
import * as UseSensorData from '../../src/hooks/useSensorData';
import {mockSensorData} from '../../src/constants/mockSensorData';
import {DEFAULT_THRESHOLD} from '../../src/constants/defaultThreshold';

const defaultSensorDataProps = {
  threshold: DEFAULT_THRESHOLD,
  thresholdIsLoading: true,
};

describe('SensorData 컴포넌트 단위 테스트', () => {
  it('sensorData가 null일 시 센서 데이터가 없다는 문구가 포함된 화면이 출력된다.', () => {
    jest.spyOn(UseSensorData, 'useSensorData').mockImplementation(() => ({
      sensorData: null,
      lastUpdate: new Date().toLocaleTimeString(),
      refreshing: false,
      setRefreshing: jest.fn(),
      updateSensorData: jest.fn(),
    }));

    render(<SensorData {...defaultSensorDataProps} />);

    expect(screen.getByText('센서 데이터가 없습니다')).toBeOnTheScreen();
  });
  describe('sensorData가 존재하고, 새로고침중이 아니라면', () => {
    beforeEach(() => {
      jest.spyOn(UseSensorData, 'useSensorData').mockImplementation(() => ({
        sensorData: mockSensorData,
        lastUpdate: new Date().toLocaleTimeString(),
        refreshing: false,
        setRefreshing: jest.fn(),
        updateSensorData: jest.fn(),
      }));
    });

    it('DataCard 컴포넌트가 노출된다.', () => {
      render(<SensorData {...defaultSensorDataProps} />);

      expect(screen.getByLabelText('센서 데이터 정보')).toBeOnTheScreen();
    });
    it('새로고침 버튼이 노출된다.', () => {
      render(<SensorData {...defaultSensorDataProps} />);

      expect(screen.getByLabelText('센서 데이터 새로고침')).toBeOnTheScreen();
    });
    it('마지막 업데이트 정보가 노출된다.', () => {
      render(<SensorData {...defaultSensorDataProps} />);

      expect(screen.getByLabelText('마지막 업데이트 정보')).toBeOnTheScreen();
    });
  });
  describe('새로고침 버튼 클릭 후', () => {
    it('데이터 요청 성공 시 데이터 화면이 노출된다', async () => {
      const user = userEvent.setup();
      render(<SensorData />);

      await user.press(screen.getByLabelText('센서 데이터 새로고침'));

      await waitFor(() => {
        expect(screen.getByText('로딩중.....')).toBeOnTheScreen();
      });

      expect(screen.getByLabelText('센서 데이터 정보')).toBeOnTheScreen();
    });
  });
});
