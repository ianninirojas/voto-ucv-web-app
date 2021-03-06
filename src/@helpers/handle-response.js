import { authenticationService } from '../@services/authentication.service';
import { voterService } from '../@services';

export function handleResponse(response) {
    return response.text().then(text => {
        if (response.headers.has('token')) {
            voterService.refreshToken(response.headers.get('token'))
        }
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401].indexOf(response.status) !== -1) {
                authenticationService.logout();
            }
            else if ([403].indexOf(response.status) !== -1) {
                window.location.href('/')
                window.location.reload(true);
            }
            const error = (data && data.data) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}