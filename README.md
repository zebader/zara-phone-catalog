# ZARA CHALLENGE

## Como iniciar la applicacion

### Modo Desarrollo

Sirve la aplicación con Fast Refresh y los assets sin minimizar para facilitar el debugging

```bash
npm run dev
```

### Modo Producción

Para compilar la aplicación optimizando, concatenando y minimizando todos los assets, y posteriormente levantar el servidor de producción

1. **Compilar el proyecto:**

```bash
npm run build
```

2. **Servir el proyecto en producción:**

```bash
npm run start
```

Abre [http://localhost:3000](http://localhost:3000) con el browser para ver el resultado.

## Decisiones técnicas

- CSS modules: para scopear estilos en los componentes evitando que se pisen clases globales, es rapido y  ligero al procesarse en tiempo de compilación, ademas de ser el built-in de Next.js.
- fetch para api: Next.js esta preparado para gestionarlo cacheando, evita deduplicaciones de peticiones identicas, asi no utilizamos librerias de terceros como Axios o React query que para este caso añaden overhead y peso al bundle.
- Eslint rules, añadir ciertas rules para mantener la consistencia del codigo y que se apliquen al guardar para mejorar la experiencia de desarrollo

- Arquitectura: he optado por Feature-Driven Architecture, por un lado tener el folder de app/ para tema enrutado y manejar solo las pages desde ahi, La lógica de negocio se centraliza en una carpeta feature donde se crea el contenido por dominio, por un lado tenemos el catalog con la lista y detalle y por otro el cart, cada una con sus pages, ui, hooks, context etc... por otro lado tema de recursos transversales en otras carpetas los services, types, utils, etc... asi lo utlizo para separar conceptos (SoC) con mucha cohesion y poco acoplamiento.
