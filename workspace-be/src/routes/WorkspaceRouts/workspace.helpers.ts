export function generateUniqueSlug(inputSlug: string) {
    const regex = /^(.*?)(\d*)$/; // Capture the base string and number (if any)
    const matches = inputSlug.match(regex);
    if (matches) {
        const baseSlug = matches[1];
        let number = parseInt(matches[2]) || 0;
        
        // Check if the base slug exists in the inputSlug
        if (inputSlug.includes(baseSlug)) {
            number++; // Increment the number
        
            // Append the number to the base slug
            const outputSlug = baseSlug + number;
            return outputSlug;
        }
    } else {
        const outputSlug = inputSlug + 1;
        return outputSlug
    }
}