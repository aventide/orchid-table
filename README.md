# Orchid Table

A react based table component with the aim of sporting high configurability and convenient functionality, such as column sorting, row limit options, and styling.

### Usage

To include this component in your app, copy `components/App.js` to somewhere in your source tree (such as `Table.js`) and import it within another component's source file. 

```
import Table from './Table'
```

**Note**: At this moment in time, the `Table` component relies on `styled-components` for its styling solution. The plan is to decouple that at some point later, when I figure out how to do that well.


### Development

This project was bootstrapped with [parcel-react-app](https://www.npmjs.com/package/parcel-react-app) and includes extra files for demonstration purposes. To see the table in action or contribute, follow the steps below.

Start the development server run:

```bash
npm run dev
```

This will automatically open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

Build for production run:

```bash
npm run build
```

This will bundle your application in the `build` folder.

## Formatting and Linting

The app uses [eslint](https://github.com/eslint/eslint) and [stylelint](https://github.com/stylelint/stylelint) for linting and [prettier](https://github.com/prettier/prettier) for formatting files. Supports the following file extensions: `.js`, `.jsx`, `.json`, `.md`, `.css` and `.scss`.

To fix formatting issues:

```bash
npm run format
```

To lint your code:

```bash
npm run lint
```

### Formatting and Linting JS

If you want to fix JavaScript issues:

```bash
npm run format:js
```

To lint JavaScript code:

```bash
npm run lint:js
```

This will also fix or lint if you have `.json` and `.md` files inside the `src/` folder.

### Formatting and Linting Styles

If you want to fix only style issues:

```bash
npm run format:style
```

To lint your style:

```bash
npm run lint:style
```

## Testing

The app uses [Jest](https://github.com/facebook/jest) a test runner and [Enzyme](https://github.com/airbnb/enzyme) a testing utilitis for React.

To run all unit tests:

```bash
npm run test
```

Run watch mode:

```bash
npm run test:watch
```

Get coverage report run:

```bash
npm run test:coverage
```

## License

This project is licensed under the **MIT License** - see the [LICENSE](https://github.com/miljan-fsd/parcel-react-app/blob/master/LICENSE) file for details.
