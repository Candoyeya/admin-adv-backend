const getMenuFrontEnd = (role) => {
  let menu = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/' },
        { titulo: 'Gráficas', url: 'grafica1' },
        { titulo: 'ProgressBar', url: 'progress' },
      ]
    },
    {
      titulo: 'Maintenance',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        // { titulo: 'Users', url: 'users' },
        { titulo: 'Hospitals', url: 'hospitals' },
        { titulo: 'Doctors', url: 'doctors' },
      ]
    },
  ];

  if(role === 'ADMIN_ROLE') {
    menu[1].submenu.unshift({ titulo: 'Users', url: 'users' });
  }

  return menu;
}

module.exports = {
  getMenuFrontEnd
}