import {useLinkTo} from '@react-navigation/native';

export const useGoto = () => {
  const linkTo = useLinkTo();
  const goto = (dest: string) => {
    linkTo('/' + dest);
  };

  return goto;
};

