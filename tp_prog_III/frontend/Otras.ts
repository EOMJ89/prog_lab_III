namespace Otras {
    export class ManejadoraOtros {
        public static GetToken() {
            let token: string = '';
            if (localStorage.getItem('token') != null) {
                token = <string>localStorage.getItem('token');
            }

            return token;
        }
    }
}