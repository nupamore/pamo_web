export default {
    LOGOUT: ['GET', '/auth/logout'],
    GET_PROFILE: ['GET', '/api/v1/me'],
    GET_UPLOADERS: ['GET', '/api/v1/guilds/{guildId}/uploaders'],
    GET_IMAGES: ['GET', '/api/v1/guilds/{guildId}/images'],
    DELETE_IMAGE: ['DELETE', '/api/v1/images/{imageId}'],
}
