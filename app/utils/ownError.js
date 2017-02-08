/**
 * Created by thomasnatter on 11/7/16.
 */

class FluteError extends Error {
    constructor(message){
        super(message);
        this.message = message;
        this.name = 'FluteError';
    }
}