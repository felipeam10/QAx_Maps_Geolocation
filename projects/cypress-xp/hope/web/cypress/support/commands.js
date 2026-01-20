Cypress.Commands.add('setMapPosition', (position) => {
  window.localStorage.setItem('hope-qa:latitude', position.latitude);
  window.localStorage.setItem('hope-qa:longitude', position.longitude);
});

Cypress.Commands.add('visitWithMockGeolocation', (url, latitude = -23.5276158, longitude = -46.6810411) => {
  const mockGeolocation = (win, latitude, longitude) => {
    cy.stub(win.navigator.geolocation, 'getCurrentPosition', cb => {
      return cb({ coords: { latitude, longitude } });
    });
  };
  cy.visit(url, {
    onBeforeLoad: win => {
      mockGeolocation(win, latitude, longitude);
    }
  });
});