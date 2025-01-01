
# Manufac App

Manufac App is a React-based application that leverages Mantine for UI components and Vite for its build tool. This application provides an interface to display crop data, including average yields and cultivation areas over the years.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Build](#build)
- [Run](#run)
- [Screenshots](#screenshots)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)

---

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/devankitanand/manufac-app.git
   ```

2. Navigate to the project directory:
   ```bash
   cd manufac-app
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

---

## Usage

To start the development server:

```bash
yarn dev
```

- The development server will be available at: [http://localhost:3000](http://localhost:3000)

---

## Build

To create a production-ready build:

```bash
yarn build
```

- The optimized static files will be located in the `dist` directory.

---

## Run

To preview the production build:

```bash
yarn serve
```

- The application will be accessible at: [http://localhost:5000](http://localhost:5000)

---

## Screenshots

![D2](https://github.com/user-attachments/assets/1824f348-29e4-4bfa-84df-6953c6769f34)
![D1](https://github.com/user-attachments/assets/96dd432e-46cd-4bd0-84f7-8235f9cae34a)
![d3](https://github.com/user-attachments/assets/1a64d595-9980-41f0-9015-1bf3097e6adf)



---

## Folder Structure

The project follows a structured directory layout:

```
manufac-app/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── Yeardata.tsx
│   │   ├── CropAverages.tsx
|   |   |── CropBarChart.tsx
│   ├── App.tsx
│   ├── main.tsx
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
```

---

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Apache-Echarts**: Apache ECharts is a free, powerful charting and visualization library
- **Mantine**: Component library for building UI.
- **Vite**: Next-generation frontend tooling for fast builds and development.
- **TypeScript**: Typed superset of JavaScript.

---

