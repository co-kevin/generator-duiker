package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.enums;

public enum <%= enumClass %> {
    <%_ for (var i = 0; i < enums.length; i++) { _%>
        <%_ const e = enums[i] _%>
    <%= e.toUpperCase() %><%= i == (e.length - 1) ? ';':',' %>
    <%_ } _%>
}
