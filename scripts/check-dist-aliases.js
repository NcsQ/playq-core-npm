// Fails the build if disallowed alias strings are present in compiled dist
const { execSync } = require('child_process');

try {
  const out = execSync("grep -R '@playq\\|@config/runner' -n dist", { stdio: 'pipe' }).toString();
  if (out && out.trim().length) {
    console.error('Disallowed alias strings found in dist:\n' + out);
    process.exit(1);
  }
} catch (err) {
  // grep exits non-zero when no matches; that's success for us
  process.exit(0);
}
