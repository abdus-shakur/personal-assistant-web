
export function logoutUser() {
    let logoutSuccess = true;
    return new Promise((resolve, reject) => {
        try {
            if (logoutSuccess) {
                resolve();
            } else {
                reject('Failed');
            }
        } catch (err) {
            reject('Failed');
        }
    });
}