const purple = {
  100: "#7c33e5",
  200: "#621acc",
  300: "#4d149f",
  400: "#370e71",
  500: "#1b0738",
  600: "#130527",
  700: "#0b0317",
};

const neonGreen = {
  200: "#94ffc7",
};

const colorPalette = {
  background: {
    primary: `${purple[600]}CC`,
    light: `${purple[500]}EE`,
    dark: `${purple[700]}AA`,
  },
  selection: {
    primary: purple[300],
  },
  border: {
    primary: `${neonGreen[200]}44`,
    hover: `${neonGreen[200]}77`,
    active: `${neonGreen[200]}99`,
  },
  text: {
    link: {
      color: purple[100],
      hover: purple[200],
    },
  },
  components: {
    AvatarGroup: {
      color: purple[100],
      backgroundColor: purple[500],
    },
  },
};

export default colorPalette;
