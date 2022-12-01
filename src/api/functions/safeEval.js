export function safeEval(code) {
    const blacklistedWords = [
        'process',
        'token',
        'exit',
        'reply',
        'destroy'
    ]

    if (code.includes(blacklistedWords)) {
        console.log('Blacklisted word in eval.');
        return;
    } else {
        return eval(code);
    };
};