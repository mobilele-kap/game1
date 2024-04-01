function get_random_int_range(num_min, num_max) {
    const multiplier = num_max - num_min;
    return Math.floor(Math.random() * multiplier + num_min);
}

export {get_random_int_range}