
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
   git clone https://github.com/yourusername/manufac-app.git
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

![yeardata3](https://github.com/user-attachments/assets/bb0790fc-82d7-44c6-9de2-7492aed7c49f)
![yeardata2](https://github.com/user-attachments/assets/b9c413b3-4d36-49b1-8716-477ac5806930)
![yeardat1](https://github.com/user-attachments/assets/034d377b-c1a7-41a4-81cd-5f6db413d689)
![mainmanufac](https://github.com/user-attachments/assets/6aeba386-f744-4a14-8e33-e473e398b433)
![cropdata](https://github.com/user-attachments/assets/b98b6343-eccd-4920-9f34-b6523a0a90c6)


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
- **Mantine**: Component library for building UI.
- **Vite**: Next-generation frontend tooling for fast builds and development.
- **TypeScript**: Typed superset of JavaScript.

---

