package com.zdan91.smart.bill.web.rest;

import com.baomidou.mybatisplus.plugins.Page;
import com.zdan91.smart.bill.model.SampleModel;
import com.zdan91.smart.bill.service.SampleModelService;
import com.zdan91.smart.bill.web.rest.vo.ResponseVO;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Rest controller. SampleModel
 */
@RestController
@RequestMapping("/api")
public class SampleModelResource {

    private Logger log = LoggerFactory.getLogger(EleBankResource.class);

    private final SampleModelService service;

    public SampleModelResource(SampleModelService service) {
        this.service = service;
    }

    /**
     * Get /sample_model : Create a new sample_model
     *
     * @param sampleModel the sample_model to create
     * @return the ResponseEntity with status 200 (OK) and with body the new sampleModel
     */
    @PostMapping("/sample_model")
    public ResponseVO createSampleModel(@Valid @RequestBody SampleModel sampleModel) {
        log.debug("REST request to save SampleModel : {}", sampleModel);
        service.insert(sampleModel);
        return ResponseVO.response().build();
    }

    /**
     * PUT /sample_model : Updates an existing sample_model
     *
     * @param sampleModel the sample_model to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated sample_model
     */
    @PutMapping("/sample_model")
    public ResponseVO updateSampleModel(@Valid @RequestBody SampleModel sampleModel) {
        log.debug("REST request to update SampleModel : {}", sampleModel);
        service.updateById(sampleModel);
        return ResponseVO.response().build();
    }

    /**
     * GET /sample_model : get all sample_model.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and with body all ele_bank
     */
    @GetMapping("/sample_model")
    @ApiOperation(value = "get all sample_model.", response = Page.class)
    public ResponseVO getAllSampleModel(@ApiParam Page pageable) {
        final Page<SampleModel> page = service.selectPage(pageable);
        return ResponseVO.response().setData(page).build();
    }

    /**
     * GET /sample_model/:id : get the "id" sample_model
     *
     * @param id the id of the sample_model to find
     * @return
     */
    @GetMapping("/sample_model/{id}")
    @ApiOperation(value = "get the \"id\" sample_model", response = SampleModel.class)
    public ResponseVO getSampleModel(@PathVariable Integer id) {
        log.debug("REST request to get SampleModel : {}", id);
        SampleModel entity = service.selectById(id);
        return ResponseVO.response().wrapOrNotFound(entity).build();
    }

    /**
     * DELETE /sample_model/:id : delete the "id" sample_model.
     *
     * @param id the id of the sample_model to delete
     * @return
     */
    @DeleteMapping("/sample_model/{id}")
    public ResponseVO deleteSampleModel(@PathVariable Integer id) {
        log.debug("REST request to delete SampleModel : {}", id);
        service.deleteById(id);
        return ResponseVO.response().build();
    }
}
