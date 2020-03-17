﻿using System;
using System.Reflection;
using System.Text.RegularExpressions;

namespace Uploadarr.Common
{

    public enum PlatformType
    {
        DotNet = 0,
        Mono = 1
    }

    public interface IPlatformInfo
    {
        Version Version { get; }
    }

    public class PlatformInfo : IPlatformInfo
    {
        private static readonly Regex MonoVersionRegex = new Regex(@"(?<=\W|^)(?<version>\d+\.\d+(\.\d+)?(\.\d+)?)(?=\W)", RegexOptions.Compiled | RegexOptions.IgnoreCase);

        private static PlatformType _platform;
        private static Version _version;

        static PlatformInfo()
        {
            if (Type.GetType("Mono.Runtime") != null)
            {
                _platform = PlatformType.Mono;
                _version = GetMonoVersion();
            }
            else
            {
                _platform = PlatformType.DotNet;
            }
        }

        public static PlatformType Platform => _platform;
        public static bool IsMono => Platform == PlatformType.Mono;
        public static bool IsDotNet => Platform == PlatformType.DotNet;

        public static string PlatformName
        {
            get
            {
                if (IsDotNet)
                {
                    return ".NET";
                }

                return "Mono";
            }
        }

        public Version Version => _version;

        public static Version GetVersion()
        {
            return _version;
        }

        private static Version GetMonoVersion()
        {
            try
            {
                var type = Type.GetType("Mono.Runtime");

                if (type != null)
                {
                    var displayNameMethod = type.GetMethod("GetDisplayName", BindingFlags.NonPublic | BindingFlags.Static);
                    if (displayNameMethod != null)
                    {
                        var displayName = displayNameMethod.Invoke(null, null).ToString();
                        var versionMatch = MonoVersionRegex.Match(displayName);

                        if (versionMatch.Success)
                        {
                            return new Version(versionMatch.Groups["version"].Value);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Couldnt get Mono version: " + ex.ToString());
            }

            return new Version();
        }

    }
}