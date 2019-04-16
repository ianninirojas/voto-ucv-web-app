import { voterService } from '../@services';

export function authHeader() {
    const token = voterService.currentVoterValue;
    if (token) {
        return `Bearer ${token}`;
    } else {
        return {};
    }
}