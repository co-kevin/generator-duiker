package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.web.rest;

import com.baomidou.mybatisplus.plugins.Page;
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.model.<%= entityClass %>;
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.service.<%= entityClass %>Service;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Rest controller. <%= entityClass %>
 */
@Slf4j
@RestController
@RequestMapping("/api")
public class <%= entityClass %>Resource {

    private final <%= entityClass %>Service service;

    public <%= entityClass %>Resource(<%= entityClass %>Service service) {
        this.service = service;
    }

    /**
     * Get /<%= tableName %> : Create a new <%= tableName %>
     *
     * @param <%= entityClassCamelCase %> the <%= tableName %> to create
     * @return the ResponseEntity with status 200 (OK) and with body the new <%= entityClassCamelCase %>
     */
    @PostMapping("/<%= tableName %>")
    public ResponseEntity<<%= entityClass %>> create<%= entityClass %>(@Valid @RequestBody <%= entityClass %> <%= entityClassCamelCase %>) {
        log.debug("REST request to save <%= entityClass %> : {}", <%= entityClassCamelCase %>);
        service.insert(<%= entityClassCamelCase %>);
        return ResponseEntity.ok(<%= entityClassCamelCase %>);
    }

    /**
     * PUT /<%= tableName %> : Updates an existing <%= tableName %>
     *
     * @param <%= entityClassCamelCase %> the <%= tableName %> to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated <%= tableName %>
     */
    @PutMapping("/<%= tableName %>")
    public ResponseEntity<<%= entityClass %>> update<%= entityClass %>(@Valid @RequestBody <%= entityClass %> <%= entityClassCamelCase %>) {
        log.debug("REST request to update <%= entityClass %> : {}", <%= entityClassCamelCase %>);
        service.updateById(<%= entityClassCamelCase %>);
        return ResponseEntity.ok(<%= entityClassCamelCase %>);
    }

    /**
     * GET /<%= tableName %> : get all <%= tableName %>.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all <%= tableName %>
     */
    @SuppressWarnings("unchecked")
    @GetMapping("/<%= tableName %>")
    @ApiOperation(value = "get all <%= tableName %>.", response = Page.class)
    public ResponseEntity<Page<Person>> getAll<%= entityClass %>(@ApiParam Page pageable) {
        final Page<<%= entityClass %>> page = service.selectPage(pageable);
        return ResponseEntity.ok(page);
    }

    /**
     * GET /<%= tableName %>/:detail : get the "id" <%= tableName %>
     *
     * @param id the id of the <%= tableName %> to find
     * @return
     */
    @GetMapping("/<%= tableName %>/detail")
    @ApiOperation(value = "get the \"id\" <%= tableName %>", response = <%= entityClass %>.class)
    public ResponseEntity<<%= entityClass %>> get<%= entityClass %>(@RequestParam Integer id) {
        log.debug("REST request to get <%= entityClass %> : {}", id);
        <%= entityClass %> entity = service.selectById(id);
        return ResponseEntity.ok(entity);
    }

    /**
     * DELETE /<%= tableName %> : delete the "id" <%= tableName %>.
     *
     * @param id the id of the <%= tableName %> to delete
     * @return
     */
    @DeleteMapping("/<%= tableName %>")
    public void delete<%= entityClass %>(@RequestParam Integer id) {
        log.debug("REST request to delete <%= entityClass %> : {}", id);
        service.deleteById(id);
    }
}
