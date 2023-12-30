import {useLinkTo} from '@react-navigation/native';

const useGoto = () => {
  const linkTo = useLinkTo();
  const goto = (dest: string) => {
    linkTo('/' + dest);
  };

  return goto;
};

export default useGoto;
