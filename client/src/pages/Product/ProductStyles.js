import { grey } from '@mui/material/colors';

const gridSectionStyles = {
  padding: 1,
  marginBottom: 4,
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  borderRadius: '4px',
  boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  background: '#fff'
}

const gridStyles={
  padding: 1
};

const imageStyles={
  width: '100%'
}

const reviewWrapStyles={
  borderTop: `1px solid ${grey[500]}`,
  paddingTop: 2
}

const reviewRecStyles={
  paddingLeft: 1
}

export {gridSectionStyles, gridStyles, imageStyles, reviewWrapStyles, reviewRecStyles};