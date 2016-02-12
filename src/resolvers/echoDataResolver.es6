export default function (params) {

  return new Promise((resolve, reject) => {

    console.log('resolving echo request');
    console.log(params);

    setTimeout(function () {
      resolve(params.data);
    }, params.sleep);

  });

}
