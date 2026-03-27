export const queryKeys = {
    posts: ['posts'] as const,
    post: (id: string) => ['post', id] as const,
    comments: (postId: string) => ['comments', postId] as const,
}
