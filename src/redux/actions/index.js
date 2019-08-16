export const increasePage = () => ({
    type   : 'INCREASE_PAGE'
  });

export const resetPage = () => ({
    type   : 'RESET_PAGE'
  });

export const setCurrentBreed = (data) => ({
    type    :   'SET_CURRENT_BREED',
    payload :   data
  });