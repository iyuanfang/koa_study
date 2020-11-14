import MemoryService from "../src/service/MemoryService";

var m =new MemoryService();

test('get one', () => {
    const data = m.getOne("1111");
    expect(data).toEqual({one: 1, two: 2});
  });

