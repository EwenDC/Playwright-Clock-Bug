# Playwright Clock Bug

This is a minimal reproduction based off a legacy Vue 2 application maintained at our company. We recently decided to use `page.clock` to speed up our end-to-end tests by allowing us to skip minutes of idle time waiting for frontend polling events. However, once we added `page.clock` to our tests, some of our tests started failing for reasons unrelated to the polling.

Namely, we had a test involving verifying the values shown in a select list within a dialog. Before adding a `clock.fastForward` call, this test worked fine. However, after adding the `clock.fastForward` call, the select list became totally unresponsive to click events. We also sporadically observed this behaviour in other parts of the UI (even before `clock.fastForward` was called), namely in icon buttons with tooltips. These buttons would fail to register clicks if you clicked directly on the icon, but would still register clicks against the button whitespace. I have included both listed scenarios in the reproduction, but unfortunately I was not able to get the failed icon button click to reliably trigger.

We observed these scenarios both within test executions, and when manually interacting with the test browsers in debug mode. Interestingly, I observed that when using debug mode, it was possible to get the select list to work by calling `.click()` on the `<div>` with the class `el-input` that surrounds the `<input>` element. This leads me to believe the root cause of this issue is page events not properly propagating when `page.clock` is in use, though I have no idea why that would be the case.

## Reproduction Steps

1. Clone the repository at https://github.com/EwenDC/Playwright-Clock-Bug
2. Execute the command `npm install`
3. Run the two included Playwright tests using the `npm test` command.

## Expected Behaviour

The test "works without mock clock" should pass, and the test "fails with mock clock" should fail, as the only difference between the two tests is the use of `page.clock` (which should have no effect on the functionality of this demo app)

## Actual Behaviour

Both tests pass, as when the mocked clock is installed and time is fast forwarded, the select list within the dialog stops receiving click events.
