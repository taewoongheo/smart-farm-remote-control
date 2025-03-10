import deepFreeze from '../../src/utils/freeze';

describe('deepFreeze', () => {
  let testobj;

  beforeEach(() => {
    testobj = {
      name: {
        first: 'heo',
        last: 'taewoongh',
      },
    };
  });

  it('동결된 객체의 프로퍼티 변경 시 값이 변경되지 않으면 true를 반환한다', () => {
    deepFreeze(testobj);

    testobj.name.first = 'kim';

    expect(testobj.name.first).toBe('heo');
  });

  it('얕은 동결된 객체가 전달 시, 깊은 동결된 객체를 반환한다', () => {
    Object.freeze(testobj);

    testobj.name.first = 'kim';

    expect(testobj.name.first).toBe('kim');

    deepFreeze(testobj);

    testobj.name.first = 'heo';

    expect(testobj.name.first).toBe('kim');
  });

  it('null이 전달되면 그대로 반환한다', () => {
    const ret = deepFreeze(null);

    expect(ret).toBe(null);
  });

  it('object가 아닌 인자가 전달되면 그대로 반환한다', () => {
    expect(deepFreeze(1)).toBe(1);

    expect(deepFreeze('test')).toBe('test');

    expect(deepFreeze(true)).toBe(true);

    expect(deepFreeze(undefined)).toBe(undefined);
  });
});
