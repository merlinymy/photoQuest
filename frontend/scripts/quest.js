const data = await fetch(`/quest/${window.location.href.split("/").pop()}`);
console.log(data);
