# ZARA CHALLENGE

El objetivo de esta prueba es la creación de una aplicación web enfocada en la visualización, búsqueda y gestión de un catálogo de teléfonos móviles. La aplicación debe permitir a los usuarios consultar detalles específicos de cada dispositivo, así como gestionar un carrito de compras de manera eficiente.

Resultado (Despliegue de la aplicación) -> [https://zara-phone-catalog-seven.vercel.app/catalog](https://zara-phone-catalog-seven.vercel.app/catalog)

## Como iniciar la applicacion

### Modo Desarrollo

Sirve la aplicación con Fast Refresh y los assets sin minimizar para facilitar el debugging

```bash
pnpm dev
```

### Modo Producción

Para compilar la aplicación optimizando, concatenando y minimizando todos los assets, y posteriormente levantar el servidor de producción

1. **Compilar el proyecto:**

```bash
pnpm build
```

2. **Servir el proyecto en producción:**

```bash
pnpm start
```

Abre [http://localhost:3000](http://localhost:3000) con el browser para ver el resultado.

## Decisiones técnicas

- CSS modules: para scopear estilos en los componentes evitando que se pisen clases globales, es rapido y  ligero al procesarse en tiempo de compilación, ademas de ser el built-in de Next.js.
- Fetch para api: Next.js esta preparado para gestionarlo cacheando, evita deduplicaciones de peticiones identicas, asi no utilizamos librerias de terceros como Axios o React query que para este caso añaden overhead y peso al bundle.
- Eslint rules, añadir ciertas rules para mantener la consistencia del codigo y que se apliquen al guardar para mejorar la experiencia de desarrollo
- Añadi un debounce para que las busquedas por api no lancen requests en cam input change, use un metodo practico actualizando los searchParams de la url para comunicar el client component con el parent server component y ademas mantener el estado y poder compartir la url de busqueda
- Para el grid el challenge era mantener ese borde tan fino y la animacion, primero pense en jugar con el fondo del grid y el gap de 1px y el fondo blanco en los cards para que solo el pixel del gap se viera pero surgian muchos edge cases si no cuadraba el numero de items, luego probe a ponerle border a la izquierda y top del grid y a la derecha y bottom del card pero cuando habia menos de 4 elementos la linea del top se dejaba ver, al final use el desplazamiento de 1px en el padding del grid y -1 en el margin del card, formando la solucion a todos los casos, ademas usando el pseudo elemento ::before con el transform se conseguia la animacion a 60fps
- CartContext para manejar los updates del carrito y el localStorage, al usar el storage no era tan sencillo como usar useStates solo ya que hay que esperar al localStorage en el mount y settear el state lo que puede dar lugar a loops, por eso use el useSyncExternalStore que actua como puente seguro entre los datos externos y react, con el subscribeToCart añadimos un listener (componentes que dependen del cart) que cuando el addCartItem modifca los datos se ejecuta el notify para que el getCartSnapshot avise a react y re renderice si fuera necesario los nuevos cambios, con el getServerCartSnapshot evitamos que se rompa la app en ssr al no tener localStorage ni window.
- Typescript no he sido muy explicito con el tipado lo he usado sobretodo para tener la documentacion de la api y props facilitar autocompletado etc.

- Arquitectura: he optado por Feature-Driven Architecture, por un lado tener el folder de app/ para tema enrutado y manejar solo las pages desde ahi, La lógica de negocio se centraliza en una carpeta feature donde se crea el contenido por dominio, por un lado tenemos el catalog con la lista y detalle y por otro el cart, cada una con sus pages, ui, hooks, context etc... por otro lado tema de recursos transversales en otras carpetas los services, types, utils, etc... asi lo utlizo para separar conceptos (SoC) con mucha cohesion y poco acoplamiento.

## Notas extra

### Testing

- Solo anotar que me hubiera gustado hacer los test desde una etapa mas temprana pero al tratarse de un proyecto largo requiere mucho tiempo y priorice tener todo el proyecto terminado primero, además me sirve para utilizar el tiempo sobrante en testear ,documentar y refactorizar components, para ello he usado Jest y testing library, cabe decir que testee solo en lo mas critico usando unit test y de integracion.

### Uso de IA

- Como para este proyecto se pedia utilizar la IA la menor posible, me gustaria compartir para que he podido usarlo y por que, a pesar de usar cursor no he usado los agentes, excepto en modo ASK y gemini externamente para comprobar hipotesis, verificar si mi direccion era la correcta, etc, donde si he usado mas fue en el tema del grid por que queria probar alguna formas mas moderna o elegante de conseguir el borde y la animacion, aunque al final fue la opcion mas estandar, en el tema del context al usar el localStorage sabia que daria problemas asi que en vez de buscar use la IA para hacer el reseach de como hacerlo mejoer y me sugirio el hook useSyncExternalStore que no habia utilizado nunca, tambien me he servido de IA para los tests. Por ultimo si que use cursor para correr un agente para hacer review del codigo y encontrar posibles mejoras, revisar si la accesibilidad estaba correctamente aplicada, empece con algunos textos en español y use la IA para cambiar todo lo español al ingles, etc... con un proyecto tan largo me ayudo a darle un vistazo desde otra perspectiva.

### TODO

- Añadir skeletons para dar feedback al usuario de que se esta haciendo un request
- Mejorar el defensive programming de algunos componentes que no he tenido tiempo para evitar mostrar partes si no se pasan props sobre todo si viene de la api y crear mas test para esto.
- Mejorar la gestión de los textos, ahora mismo estan hardcodeados.
