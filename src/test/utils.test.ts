import {
  assertEquals,
  assertMatch,
  assertNotEquals,
} from "https://deno.land/std@0.161.0/testing/asserts.ts";
import * as utils from "../utils.ts";

Deno.test("Have terminal on vscode when run createVscodeTerminal", function () {
  const terminal = utils.createVscodeTerminal();
  assertNotEquals(terminal, null);
  assertMatch(
    terminal.name,
    new RegExp(utils.EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME, "g"),
  );
});

Deno.test("Have terminal on vscode when run getVscodeTerminal", function () {
  const terminal = utils.getVscodeTerminal();
  assertNotEquals(terminal, null);
  assertMatch(
    terminal.name,
    new RegExp(utils.EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME, "g"),
  );
});

Deno.test("Have command on vscode terminal when run runCommandOnVsTerminal", function () {
  const commandParam = "Test command";
  const terminal = utils.getVscodeTerminal();
  terminal.window.onDidWriteTerminalData(function ({ data }: { data: string }) {
    assertEquals(data, commandParam);
  });
  terminal.sendText(`echo "${commandParam}"`);
});
