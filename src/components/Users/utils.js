import type { User } from '../flowDefs';

function profilePicUrl(user: User, size : number = 100) {
  if (user.masterAuth === 'facebook') {
    return `https://graph.facebook.com/${user.extra}/picture?type=normal&width=${size}&height=${size}`;
  }
  return `http://api.adorable.io/avatar/${size}/${user.name}`;
}

export { profilePicUrl };
