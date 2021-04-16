using System;

namespace CreatureBracket.Attributes
{
    [AttributeUsage(AttributeTargets.Property, Inherited = true, AllowMultiple = false)]
    public class SettingGroupAttribute : Attribute
    {
        public string GroupName { get; private set; }

        public SettingGroupAttribute (string groupName) : base ()
        {
            GroupName = groupName;
        }
    }
}
