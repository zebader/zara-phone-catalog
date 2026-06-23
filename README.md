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
- Añadi un debounce para que las busquedas por api no lancen requests en cam input change, use un metodo practico actualizando los searchParams de la url para comunicar el client component con el parent server component y ademas mantener el estado y poder compartir la url de busqueda
- Para el grid el challenge era mantener ese borde tan fino y la animacion, primero pense en jugar con el fondo del grid y el gap de 1px y el fondo blanco en los cards para que solo el pixel del gap se viera pero surgian muchos edge cases si no cuadraba el numero de items, luego probe a ponerle border a la izquierda y top del grid y a la derecha y bottom del card pero cuando habia menos de 4 elementos la linea del top se dejaba ver, al final use el desplazamiento de 1px en el padding del grid y -1 en el margin del card, formando la solucion a todos los casos, ademas usando el pseudo elemento ::before con el transform se conseguia la animacion a 60fps

- Arquitectura: he optado por Feature-Driven Architecture, por un lado tener el folder de app/ para tema enrutado y manejar solo las pages desde ahi, La lógica de negocio se centraliza en una carpeta feature donde se crea el contenido por dominio, por un lado tenemos el catalog con la lista y detalle y por otro el cart, cada una con sus pages, ui, hooks, context etc... por otro lado tema de recursos transversales en otras carpetas los services, types, utils, etc... asi lo utlizo para separar conceptos (SoC) con mucha cohesion y poco acoplamiento.
