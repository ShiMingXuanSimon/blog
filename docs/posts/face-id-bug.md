---
title: 我发现了一个 iOS 安全设计上的漏洞，并报告给了 Apple
date: 2026-03-03
---

# 我发现了一个 iOS 安全设计上的漏洞，并报告给了 Apple

大概就是，关闭第三方应用的 Face ID 访问权限不需要任何验证。

例如，在小天才APP中，打开上课禁用的设置页面时，小天才会调用系统api进行人脸验证，防止小孩偷家长手机关闭禁用。但是，我只需要打开设置，把小天才app访问Facd ID的权限关掉，小天才就会跳过人脸验证，直接打开上课禁用的设置页面。

虽然关闭权限后不进行验证是小天才的锅，但是，关闭 Face ID 权限难道不应该需要任何验证吗？

这个漏洞虽然没啥危险（谁会像小天才一样，关闭权限后不进行其他方式的验证），但我考虑后，出于道德因素，我仍然报告给了Apple。

以下是报告原文：

```markdown
# Affected platform
Apple Devices and Software

# Affected area
Face ID

# Title
Closing 3rd-Party App's Face ID Access Permission Does Not Require Any Verification

# What is required to reproduce the issue?
- A 3rd-party app which requires Face ID Access. For example, `小天才` APP developed by Guangdong Genius Technology Co., Ltd. 
- An iPhone 13 Pro with iOS26.3.

# Summary
Turning off Face ID access for a third-party app does not require any authentication, allowing the app to bypass the verification.

# Steps to reproduce
1. Open the `Settings` app, tap `Apps`.
2. Choose a 3rd-party app which requires Face ID access.
3. Tap `Access` then toggle the switch next to `Face ID` item.


# Expected results
Turning off the access should require Face ID authentication.


# Actual results
The Access is closed without ANY verify. **NO** Face ID, **NO** passcode prompt. The app then bypasses the authentication requirement. (Maybe bypass is caused by the app itself)


# Credit
施明轩
```