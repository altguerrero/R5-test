# Mi Proyecto de Aplicación

## Descripción

Esta es una aplicación desarrollada con React, React Router y React Query. La aplicación permite a los usuarios explorar una tienda de libros, ver detalles de libros específicos y gestionar su biblioteca personal.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Instalación

Para instalar y ejecutar la aplicación localmente, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone git@github.com:altguerrero/R5-test.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd R5-test
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

Para iniciar la aplicación en modo de desarrollo, ejecuta:

```bash
npm run dev
```

Esto iniciará la aplicación en `http://localhost:5173`.

## Ejecución de Pruebas

Para ejecutar las pruebas unitarias y de integración, usa el siguiente comando:

```bash
npm test
```

Esto ejecutará todas las pruebas definidas en el proyecto utilizando Jest y React Testing Library.

## Estructura del Proyecto

A continuación se muestra una descripción general de la estructura del proyecto:

```
├── public
│   ├── index.html
├── src
│   ├── components
│   │   └── shared
│   │       ├── Loader.tsx
│   │       ├── Navbar.tsx
│   ├── views
│   │   ├── Home.tsx
│   │   ├── BookStore.tsx
│   │   ├── Detail.tsx
│   │   ├── Library.tsx
│   ├── App.tsx
│   ├── Layout.tsx
│   ├── index.css
│   ├── main.tsx
│   └── __test__
│       ├── App.test.tsx
│       ├── main.test.tsx
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Contribuciones

¡Las contribuciones son bienvenidas! Para contribuir, sigue estos pasos:

1. Realiza un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y realiza un commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tu rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un nuevo Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Para más detalles, consulta el archivo [LICENSE](LICENSE).
