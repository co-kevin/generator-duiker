package <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.web.rest;

import com.baomidou.mybatisplus.plugins.Page;
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.model.<%= entityClass %>;
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.service.<%= entityClass %>Service;
import <%= groupCases.splitByDot %>.<%= nameCases.splitByDot %>.web.rest.vo.ResponseVO;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Rest controller. <%= entityClass %>
 */
@RestController
@RequestMapping("/api")
public class <%= entityClass %>Resource {

    private Logger log = LoggerFactory.getLogger(<%= entityClass %>Resource.class);

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
    public ResponseVO create<%= entityClass %>(@Valid @RequestBody <%= entityClass %> <%= entityClassCamelCase %>) {
        log.debug("REST request to save <%= entityClass %> : {}", <%= entityClassCamelCase %>);
        service.insert(<%= entityClassCamelCase %>);
        return ResponseVO.response().build();
    }

    /**
     * PUT /<%= tableName %> : Updates an existing <%= tableName %>
     *
     * @param <%= entityClassCamelCase %> the <%= tableName %> to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated <%= tableName %>
     */
    @PutMapping("/<%= tableName %>")
    public ResponseVO update<%= entityClass %>(@Valid @RequestBody <%= entityClass %> <%= entityClassCamelCase %>) {
        log.debug("REST request to update <%= entityClass %> : {}", <%= entityClassCamelCase %>);
        service.updateById(<%= entityClassCamelCase %>);
        return ResponseVO.response().build();
    }

    /**
     * GET /<%= tableName %> : get all <%= tableName %>.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all <%= tableName %>
     */
    @GetMapping("/<%= tableName %>")
    @ApiOperation(value = "get all <%= tableName %>.", response = Page.class)
    public ResponseVO getAll<%= entityClass %>(@ApiParam Page pageable) {
        final Page<<%= entityClass %>> page = service.selectPage(pageable);
        return ResponseVO.response().setData(page).build();
    }

    /**
     * GET /<%= tableName %>/:id : get the "id" <%= tableName %>
     *
     * @param id the id of the <%= tableName %> to find
     * @return
     */
    @GetMapping("/<%= tableName %>/{id}")
    @ApiOperation(value = "get the \"id\" <%= tableName %>", response = <%= entityClass %>.class)
    public ResponseVO get<%= entityClass %>(@PathVariable Integer id) {
        log.debug("REST request to get <%= entityClass %> : {}", id);
        <%= entityClass %> entity = service.selectById(id);
        return ResponseVO.response().wrapOrNotFound(entity).build();
    }

    /**
     * DELETE /<%= tableName %>/:id : delete the "id" <%= tableName %>.
     *
     * @param id the id of the <%= tableName %> to delete
     * @return
     */
    @DeleteMapping("/<%= tableName %>/{id}")
    public ResponseVO delete<%= entityClass %>(@PathVariable Integer id) {
        log.debug("REST request to delete <%= entityClass %> : {}", id);
        service.deleteById(id);
        return ResponseVO.response().build();
    }
}
