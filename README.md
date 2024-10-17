# Showtimes

[Live Demo](https://sashacode11.github.io/showtimes/)

An application that shows movie schedules, with automatic updates every minute. It displays movie titles, showtimes, censorship ratings, and session availability based on data fetched from a local JSON file. The app updates the movie showtimes every minute, adjusting the display based on movie availability, start times, VIP status, and exhibition type. The interface also changes colors for sessions depending on their status (e.g., sold out, starting soon, premiere).

## Features

- **Auto-refresh**: Updates the schedule every minute to keep the movie times accurate.
- **Sold out sessions**: Displays sessions with a red background if they are sold out.
- **Starting soon sessions**: Highlights sessions in green when they start in 15 minutes or less.
- **Exhibition types**: Groups movies by exhibition type (e.g., 2D, 3D, XD).
- **VIP and Premiere movies**: Uses special colors to highlight premiere movies based on their VIP status.
- **Dynamic display**: Automatically hides movies that have already started.

## Setup

1. **Install dependencies**:

    ```
    npm install
    ```

2. **Run the app**:

    ```
    npm run dev
    ```

### Deployment Steps:

1. **Build the app**:

    ```
    npm run build
    ```

2. **Push to GitHub Pages**:

    ```bash
    git subtree push --prefix dist origin gh-pages
    ```

## How It Works

- The app reads the `0725-BoxOffice.json` file and organizes movies by title, showtime, and exhibition type.
- Movie sessions update every minute and adjust based on the current time.
- Movies that have already started are automatically hidden.
- Icons for censorship and exhibition types are displayed based on the data from the JSON file.

## Special Rules

- **Session backgrounds**:
    - Red for sold out sessions (`L` in the Places field).
    - Green for sessions starting in 15 minutes or less.
- **VIP and Regular**:
    - Special color for VIP (`S`) and hybrid (`H`) movies.
    - Regular movies (`N`) use the default style.

## Technologies Used

- **Vue.js**: Frontend framework.
- **JavaScript**: Logic for handling the data and updating the UI.
- **CSS**: Styling and layout adjustments based on movie status.

## GitHub Pages Deployment

To publish the app on GitHub Pages, you can follow the guide here:  
[Deploy Vue.js App to GitHub Pages](https://learnvue.co/articles/deploy-vue-to-github-pages#step-4-run-git-subtree-push-prefix-dist-origin-gh-pages)
