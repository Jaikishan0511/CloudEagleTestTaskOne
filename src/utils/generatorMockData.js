const generateMockData = (count = 10000) => {
  const data = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      salary: Math.floor(Math.random() * 100000),
    });
  }
  return data;
};

export default generateMockData;
