export function initApp() {
  return () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('In initApp');
        resolve();
      }, 4000);
    });
  };
}
