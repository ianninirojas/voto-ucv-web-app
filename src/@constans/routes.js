export const pathRoutes = {
  CHECKTOKEN: '/eventos-electorales/:electoralEventPublickey/verificar-token/:token',
  ELECTORALEVENTS: '/eventos-electorales',
  ELECTORS: '/eventos-electorales/:electoralEventPublickey/registro-electoral',
  AUTH: '/eventos-electorales/:electoralEventPublickey/autenticacion',
  ACCESS: '/eventos-electorales/:electoralEventPublickey/acceso',
  LOGIN: '/eventos-electorales/:electoralEventPublickey/login',
  BALLOT: '/eventos-electorales/:electoralEventPublickey/boleta-electoral',
  VOTESUCCESS: '/eventos-electorales/:electoralEventPublickey/voto-exitoso',
  RESULT: '/eventos-electorales/:electoralEventPublickey/resultados',
  TIMEOUT: '/tiempo-agotado',
}