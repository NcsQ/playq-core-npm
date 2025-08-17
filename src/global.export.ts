// Consumers can import '@ncsq/playq-core/global' to register globals
import './global';
export * from './global';// Re-export the side-effectful global initializer so consumers can opt-in via subpath import
export * from './global';
