export const getData = async () => {
  let data = await fetch(`https://static.pipezero.com/covid/data.json`);
  data = await data.json();
  return data;
};
