# How to Run This Project Locally in VS Code

To get this Next.js application running on your local machine, follow these steps.

## Prerequisites

Before you start, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 20.x or later is recommended)
- [npm](https://www.npmjs.com/get-npm) (which comes with Node.js) or another package manager like [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/).
- [VS Code](https://code.visualstudio.com/) or your preferred code editor.

## Step 1: Download Project Files

You need to download all the files and folders from the root of this project. Ensure you have the same directory structure. The most important files and folders are:

- `src/`
- `package.json`
- `next.config.ts`
- `tailwind.config.ts`
- `tsconfig.json`
- `components.json`
- `apphosting.yaml`
- `README.md`
- `.env`

Essentially, you should clone or download the entire project directory.

## Step 2: Set Up Environment Variables

The AI features in this application are powered by Google's Gemini models through Genkit. To use them, you'll need an API key.

1.  Create a new file named `.env.local` in the root of your project directory. This file will securely store your API key and will not be tracked by version control.
2.  Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3.  Add the following line to your `.env.local` file, replacing `YOUR_API_KEY` with the key you just obtained:

```
GEMINI_API_KEY=YOUR_API_KEY
```

## Step 3: Install Dependencies

Open your terminal or the integrated terminal in VS Code, navigate to the project's root directory, and run the following command to install all the necessary packages:

```bash
npm install
```
*(If you use Yarn or pnpm, run `yarn install` or `pnpm install` respectively.)*

## Step 4: Run the Development Server

Once the dependencies are installed, you can start the local development server with this command:

```bash
npm run dev
```

This will start the application in development mode with Turbopack for faster performance.

## Step 5: View Your Application

Open your web browser and go to the following address:

[http://localhost:9002](http://localhost:9002)

You should now see the application running. Any changes you make to the source code will automatically reload the page.

Happy coding!
