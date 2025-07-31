// src/lib/react-query/queryKeys.ts

export const queryKeys = {
  auth: {
    login: ['login'] as const,
    signup: ['signup'] as const,
  },

  community: {
    // Key for querying all communities (e.g., list view)
    all: ["community"] as const,

    // Key for querying a specific community by its ID
    byId: (id: string) => ["community", id] as const,

    members: {
      // Key for querying all community members across all communities (if ever needed)
      all: ["community", "members"] as const,

      // Key for querying members of a specific community by community ID
      byCommunityId: (communityId: string) =>
        ["community", communityId, "members"] as const,

      // Key for querying a specific member inside a specific community
      byMemberId: (communityId: string, memberId: string) =>
        ["community", communityId, "members", memberId] as const,
    },
  },
};
