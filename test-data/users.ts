function requireEnv(key: string): string{
    const value = process.env[key]
    if(!value) throw new Error(`Missing required env var: ${key}`)
    return value
}
const password = requireEnv('SAUCE_PASSWORD')


export const users = {
    standard: { username: 'standard_user', password },
    lockedOut: { username: 'locked_out_user', password },
    problem: { username: 'problem_user', password },
    performanceGlitch: { username: 'performance_glitch_user', password },
    error: { username: 'error_user', password },
    visual: { username: 'visual_user', password },
    
}