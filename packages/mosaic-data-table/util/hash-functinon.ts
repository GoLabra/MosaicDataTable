export const hash = (value: string): string => {
    var hash = 0;
    if (value.length === 0) return `${hash}`;
    for (var i = 0; i < value.length; i++) {
        var character = value.charCodeAt(i);
        hash = ((hash << 5) - hash) + character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return `${hash}`;
}