function get_random_int_range(num_min, num_max) {
    const multiplier = num_max - num_min + 0.99999;
    return Math.floor(Math.random() * multiplier + num_min);
}

export {get_random_int_range}