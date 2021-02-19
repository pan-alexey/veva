const veva = reqire('veva/react');

const Veva = new veva({
  debug: true,
  autorun: 'server',
});

Veva.compille('server', {});
Veva.compille('client', {});


// Veva.app({
//   server: {},
//   client: {},
// });

// Veva.debug();
// Veva.build();