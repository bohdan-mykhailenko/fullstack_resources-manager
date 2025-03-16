const mockFeedbacks = [
  {
    id: "f1b2c3d4",
    content:
      "Excellent facility with caring staff. They really go above and beyond for the animals.",
    created_at: "2024-03-14T15:30:00.000Z",
    first_name: "John",
    last_name: "Smith",
  },
  {
    id: "f5e6d7c8",
    content:
      "Very clean and well-organized shelter. The adoption process was smooth and professional.",
    created_at: "2024-03-13T10:15:00.000Z",
    first_name: "Sarah",
    last_name: "Johnson",
  },
];

export const getMockPaginatedFeedbacks = (page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const items = mockFeedbacks.slice(startIndex, endIndex);

  return {
    items,
    total: mockFeedbacks.length,
    page,
    limit,
  };
};
