class Logger {
    static Log(file, func, message) {
        console.log('LOG');
        console.log(`File:`, file);
        console.log(`Function:`, func);
        console.log(`Message:`, JSON.stringify(message));
    }
    static Info(file, func, message) {
        console.log('INFO');
        console.log(`File:`, file);
        console.log(`Function:`, func);
        console.log(`Message:`, JSON.stringify(message));
    }
    static Error(file, func, message) {
        console.log('ERROR');
        console.log(`File:`, file);
        console.log(`Function:`, func);
        console.log(`Message:`, JSON.stringify(message));
    }
}
export { Logger };